import PaypalButtons from "components/ico/payment/PaypalComponent";
import { PAYPAL } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import PaymentDetails from "./paymentDetails";

const PaypalPayment = ({ initialData, pageInfo }: any) => {
  const { t } = useTranslation("common");
  const [credential, setCredential] = useState<any>({
    payment_method_id: PAYPAL,
    amount: null,
    currency: "USD",
    paypal_token: null,
    phase_id: initialData.phase_id,
    token_id: initialData.token_id,
    pay_currency: null,
  });
  return (
    <form>
      <div className="w-100 ico-tokenCreate row">
        <div className="col-md-6 form-input-div">
          <label className="ico-label-box" htmlFor="">
            {t("Amount")}
          </label>
          <input
            type="number"
            name="amount"
            value={credential.amount}
            placeholder="amount"
            required
            className={`ico-input-box`}
            onChange={(e: any) => {
              setCredential({
                ...credential,
                amount: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-md-6 form-input-div">
          <label className="ico-label-box" htmlFor="">
            {t("Select Currency")}
          </label>
          <select
            name="bank"
            className={`ico-input-box`}
            required
            onChange={(e) => {
              setCredential({
                ...credential,
                pay_currency: e.target.value,
              });
            }}
          >
            <option value="">{t("Select")}</option>
            {pageInfo?.currency_list?.map((item: any, index: any) => (
              <option value={item.code} key={index}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        {credential.pay_currency &&
          credential.amount &&
          initialData.phase_id && (
            <PaymentDetails
              currency={credential.pay_currency}
              amount={credential.amount}
              phase_id={initialData.phase_id}
              token_id={initialData.token_id}
              payment_method={PAYPAL}
            />
          )}
        {credential.amount && credential.pay_currency && (
          <div className="col-lg-12 mb-3">
            <PaypalButtons
              credential={credential}
              setCredential={setCredential}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default PaypalPayment;
