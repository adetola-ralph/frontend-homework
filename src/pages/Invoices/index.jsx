import Modal from "components/Modal";
import Pill from "components/Pill";
import useFetchDataFromLocalStorage from "hooks/useAction";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDateToReadableString, sumItems } from "utils";
import InvoiceForm from "./InvoiceForm";

const Invoices = () => {
  const [isShown, setIsShown] = useState(false);

  const invoices = useFetchDataFromLocalStorage();

  const toggleModal = () => setIsShown(!isShown);

  return (
    <>
      <div className="flex justify-between my-12">
        <div>
          <h1 className="font-bold text-3xl text-primary">Invoices</h1>
          {invoices?.length > 0 && (
            <p className="text-sm text-secondary">
              There are {invoices?.length} total invoices
            </p>
          )}
        </div>
        <button
          onClick={toggleModal}
          className="bg-btn hover:opacity-80 text-white cursor-pointer font-semibold rounded-[2.5rem] px-3 py-1 text-sm leading-normal w-1/5"
        >
          Add invoice
        </button>
      </div>

      {invoices?.length > 0 ? (
        invoices?.map(({ id, dueDate, name, status, items }) => {
          return (
            <Link
              to={`/invoice/${id}`}
              key={id}
              className="bg-white rounded-lg drop-shadow-xl py-4 pr-5 pl-8 grid grid-cols-inv-item mb-4 items-center hover:border border-btn opacity-70"
            >
              <p className="font-bold text-sm text-primary py-2">
                <span className="text-secondary">#</span>
                {id}
              </p>
              <p className="font-medium text-sm text-secondary py-2">
                Due {formatDateToReadableString(dueDate)}
              </p>
              <p className="font-medium text-sm text-secondary py-2">{name}</p>
              <p className="font-bold text-primary py-2">
                $ {sumItems(items).toLocaleString()}
              </p>
              <div className="font-bold text-xs text-primary py-2">
                <Pill status={status} />
              </div>
            </Link>
          );
        })
      ) : (
        <div>
          <p className="text-primary text-lg">
            There are no invoices available.
          </p>
        </div>
      )}

      <Modal isShown={isShown}>
        <InvoiceForm toggleModal={toggleModal} />
      </Modal>
    </>
  );
};

export default Invoices;
