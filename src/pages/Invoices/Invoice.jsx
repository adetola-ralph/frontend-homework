import logo from "assets/logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDataFromLocalStorage } from "hooks/useAction";
import Pill from "components/Pill";
import { formatDateToReadableString, sumItems } from "utils";
const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoices = useFetchDataFromLocalStorage();
  const invoice = invoices.find((invoice) => invoice.id === id);

  if (!invoice) return;

  return (
    <>
      <button onClick={() => navigate("/")} className="mt-8">
        Go back
      </button>
      <div className="bg-white drop-shadow-xl p-4 mt-12 rounded flex justify-between items-center mb-4">
        <div className="flex justify-start gap-2 items-center">
          <p>Status</p>
          <Pill status={invoice.status} />
        </div>
        <div className="flex gap-2">
          {/* TODO: handle the respective buttons */}
          <button className=" hover:opacity-80 text-secondary cursor-pointer font-semibold rounded-[2.5rem] p-3 text-sm leading-normal">
            Edit
          </button>
          {invoice.status === "pending" && (
            // Sending to the provided email address happens when marked as paid
            <button className="bg-[#037C7C] hover:opacity-80 text-white cursor-pointer font-semibold rounded-[2.5rem] p-3 text-sm leading-normal">
              Mark as Paid
            </button>
          )}
          <button className="bg-tertiary hover:opacity-80 text-white cursor-pointer font-semibold rounded-[2.5rem] p-3 text-sm leading-normal">
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white bg-opacity-60 drop-shadow-xl p-4 my-12 rounded">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="bg-tertiary" />
        </div>

        {/* Address */}
        <div className="flex justify-between mb-4">
          <div className="flex flex-col">
            <h3 className="text-primary font-bold text-lg">
              <span className="text-secondary"># </span>
              {invoice.id}
            </h3>
          </div>

          <address className="text-secondary">
            Block 22, Babatunde Anjous Avenue, <br /> Lekki Phase 1, Lagos,
            Nigeria.
          </address>
        </div>

        <div className="grid grid-cols-[150px_1fr_200px] justify-between gap-x-12 gap-y-8 mb-8">
          <div>
            <label className="text-secondary text-sm font-medium mb-2">
              Invoice date
            </label>
            <p className="text-primary font-bold mb-8">
              {formatDateToReadableString(invoice.invoiceDate)}
            </p>

            <div>
              <label className="text-secondary text-sm font-medium mb-2">
                Invoice due date
              </label>
              <p className="text-primary font-bold">
                {formatDateToReadableString(invoice.dueDate)}
              </p>
            </div>
          </div>
          <div>
            <label className="text-secondary text-sm font-medium mb-2">
              Bill to
            </label>
            <p className="text-primary font-bold text-lg">{invoice.name}</p>
            <address className="text-secondary text-sm">
              {invoice.address} <br />
              {invoice.city}, {invoice.state} <br />
              {invoice.country}
            </address>
          </div>

          <div>
            <label className="text-secondary text-sm font-medium mb-2">
              Receiver's email
            </label>
            <p className="text-primary font-bold">{invoice.email}</p>
          </div>
        </div>

        <div className="flex justify-between flex-col bg-secondary bg-opacity-5 p-4">
          {/* headers */}
          <div className="grid grid-cols-[250px_150px_150px_100px] mb-2">
            <p className="text-secondary text-sm">Item</p>
            <p className="text-secondary text-sm">Quantity</p>
            <p className="text-secondary text-sm">Price($)</p>
            <p className="text-secondary text-sm">Total</p>
          </div>
          {invoice?.items?.map(({ name, price, quantity }, i) => (
            <div
              key={`${name}-${i}`}
              className="grid grid-cols-[250px_150px_150px_100px] mb-2"
            >
              <p className="text-primary text-sm font-bold">{name}</p>
              <p className="text-primary text-sm font-bold">{price}</p>
              <p className="text-primary text-sm font-bold">{quantity}</p>
              <p className="text-primary text-sm font-bold">{`$ ${(
                +price * +quantity
              ).toLocaleString()}`}</p>
            </div>
          ))}
        </div>
        <div className="bg-tertiary rounded-br-lg rounded-bl-lg p-6 flex justify-between">
          <p className="text-white text-sm opacity-60">Amount to pay</p>
          <p className="text-white text-sm font-bold">
            $ {sumItems(invoice?.items).toLocaleString()}
          </p>
        </div>

        {invoice?.note && (
          <div className="">
            <small>Note: {invoice?.note}</small>
          </div>
        )}
      </div>
    </>
  );
};

export default Invoice;
