
import { capitalize } from 'utils';

const statusColor = {
  pending: "bg-[#FFF9F2] text-[#FF9002]",
  draft: "bg-[#F3F3F5] text-[#373C53]",
  paid: "bg-[#F4FCFA] text-[#32D7A0]",
};

const dotColor = {
  pending: "bg-[#FF9002]",
  draft: "bg-[#373C53]",
  paid: "bg-[#32D7A0]",
};
const Pill = ({ status }) => {
  return (
    <div className={`p-2 rounded ${statusColor[status]}`}>
      <span
        className={`inline-flex w-2 h-2 rounded-full ${dotColor[status]}`}
      />{" "}
      {capitalize(status)}
    </div>
  );
};

export default Pill;
