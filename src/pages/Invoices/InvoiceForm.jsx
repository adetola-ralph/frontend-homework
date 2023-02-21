import cancel from "assets/cancel.svg";
import bin from "assets/bin.svg";

import { useState } from "react";

import { useAction } from "hooks/useAction";
import { generateRandomNum } from "utils";
const InvoiceForm = ({ toggleModal }) => {
  const [items, setItems] = useState([]);
  const {handleSaveToStorage} = useAction()

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]);
  };

  const [data, setData] = useState({
    items: []
  });

  const removeItem = (i) => {
    const currItems = [...items];
    const newItems = currItems.filter((_, idx) => idx !== i);
    setItems(newItems);
  };

  const handleItems = (e, i) => {
    const {name, value} = e.target;
   
    setItems((prev) => {
        const newItem = [...prev];
        newItem[i][name] = value;
        return newItem;
      });
  }
  const onSaveOrDraft = (status) => {
    const dataToSave = {...data}
    dataToSave.status = status
    dataToSave.items = items;
    dataToSave.id = `INV${generateRandomNum()}`
    handleSaveToStorage(dataToSave);
    toggleModal();
    window.location.reload()
  }

  
  return (
    <div className="bg-white w-[600px] animate-modalSlideIn translate-x-[400px] p-8 h-full overflow-y-auto ml-auto">
      <div className="flex justify-end" onClick={toggleModal}>
        <img
          tabIndex={1}
          src={cancel}
          alt="cancel"
          className="cursor-pointer"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-primary mb-6">New Invoice</h1>

        <div className="overflow-y-auto max-h-[600px]">
          {/* Customer details */}

          <p className="font-bold text-tertiary mb-6">Bill to</p>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="text-secondary text-sm font-medium mb-2"
            >
              Customer's name
            </label>
            <input
              type="text"
              name="name"
              className="border rounded border-secondary p-2 bg-white outline-none"
              required
              value={data.name ?? ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="flex justify-between mb-4 gap-2">
            <div className="flex flex-col w-full">
              <label
                htmlFor="email"
                className="text-secondary text-sm font-medium mb-2"
              >
                Customer's email
              </label>
              <input
                type="email"
                name="email"
                className="border rounded border-secondary p-2 bg-white outline-none"
                required
                value={data?.email ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="user@example.com"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="address"
                className="text-secondary text-sm font-medium mb-2"
              >
                Customer's address
              </label>
              <input
                type="text"
                name="address"
                className="border rounded border-secondary p-2 bg-white outline-none"
                required
                value={data?.address ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>
          </div>
          {/* Address */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-2">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="city"
                className="text-secondary text-sm font-medium mb-2"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                className="border rounded border-secondary p-2 bg-white outline-none w-full"
                required
                value={data?.city ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>

            {/* TODO: should be a dropdown */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="state"
                className="text-secondary text-sm font-medium mb-2"
              >
                State
              </label>
              <input
                type="text"
                name="state"
                className="border rounded border-secondary p-2 bg-white outline-none w-full"
                required
                value={data?.state ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, state: e.target.value }))
                }
              />
            </div>
            {/* TODO: should be a dropdown */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="country"
                className="text-secondary text-sm font-medium mb-2"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                className="border rounded border-secondary p-2 bg-white outline-none w-full"
                required
                value={data?.country ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, country: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Payment terms */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            <div className="flex flex-col">
              <label
                htmlFor="invoiceDate"
                className="text-secondary text-sm font-medium mb-2"
              >
                Invoice date
              </label>
              <input
                type="date"
                name="invoiceDate"
                className="border rounded border-secondary p-2 bg-white outline-none"
                required
                min={new Date().toISOString().split("T")[0]}
                value={data?.invoiceDate ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, invoiceDate: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="dueDate"
                className="text-secondary text-sm font-medium mb-2"
              >
                Due date
              </label>
              <input
                type="date"
                name="dueDate"
                className="border rounded border-secondary p-2 bg-white outline-none"
                required
                min={new Date().toISOString().split("T")[0]}
                value={data?.dueDate ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Items */}
          <div className="grid grid-cos-3 gap-2 mb-4">
            <h3 className="text-tertiary text-2xl font-semibold opacity-70 leading-7">
              Invoice items
            </h3>
            {items?.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_100px_100px_80px_auto] gap-2 items-center mb-3"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-secondary text-sm font-medium mb-2"
                  >
                    Item name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="border rounded border-secondary p-2 bg-white outline-none"
                    required
                    value={item.name ?? ""}
                    onChange={(e) => handleItems(e, i)}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="quantity"
                    className="text-secondary text-sm font-medium mb-2"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    className="border rounded border-secondary p-2 bg-white outline-none"
                    required
                    value={item.quantity ?? 0}
                    min={0}
                    onChange={(e) => handleItems(e, i)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="price"
                    className="text-secondary text-sm font-medium mb-2"
                  >
                    Price($)
                  </label>
                  <input
                    type="text"
                    name="price"
                    className="border rounded border-secondary p-2 bg-white outline-none"
                    required
                    min={0}
                    value={item.price ?? 0}
                    onChange={(e) => handleItems(e, i)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-secondary text-sm font-medium mb-2">
                    Total($)
                  </label>
                  <input
                    type="text"
                    name=""
                    className="border border-none p-2 bg-white outline-none text-primary"
                    disabled
                    value={+item.price * +item.quantity}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-secondary text-sm font-medium mb-6" />
                  <img
                    src={bin}
                    alt="delete"
                    onClick={() => removeItem(i)}
                    className="w-5 cursor-pointer"
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center">
              <button
                onClick={addItem}
                className="text-btn p-2 cursor-pointer font-semibold"
              >
                <span>&#43; </span> Add item
              </button>
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <label
              htmlFor="note"
              className="text-secondary text-sm font-medium mb-2"
            >
              Note
            </label>
            <textarea
              name="note"
              className="border rounded border-secondary p-2 bg-white outline-none"
              required
              rows={3}
              cols={5}
              value={data?.note ?? ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, note: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => onSaveOrDraft("draft")} className="bg-secondary hover:opacity-80 text-white cursor-pointer font-semibold rounded-[2.5rem] p-3 text-sm leading-normal">
              Make as draft
            </button>
            <button onClick={() => onSaveOrDraft("pending")} className="bg-btn hover:opacity-80 text-white cursor-pointer font-semibold rounded-[2.5rem] p-3 text-sm leading-normal">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
