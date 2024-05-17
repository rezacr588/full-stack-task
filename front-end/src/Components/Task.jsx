import { useTasksContext } from "../Context/context";
import { done, unDone } from "../Assets/icons";

const Task = (props) => {
  const { text, state, createdAt, category } = props; 
  let options = { month: 'long', day: 'numeric' };
  let readableDate = new Date(createdAt).toLocaleDateString('en-US', options);
  const { deleteTask, updatedTask, openEditModal} = useTasksContext();
  return (
    <div
      style={{
        background: state ? "#F7F7F7" : "#ffffff",
        padding: "20px",
        borderRadius: 8,
        marginBottom: 12,
        cursor: "pointer"
      }}
      onClick={() => openEditModal(props)}
    >
      <div className="flex w-full justify-between mb-3">
        {state ? <span style={{
          cursor: "pointer"
        }}
          onClick={(e) => {
            e.stopPropagation();
            updatedTask(props.id, !state);
          }}
        >{done}</span> : <span
          style={{
            cursor: "pointer"
          }}
          onClick={(e) => {
            e.stopPropagation();
            updatedTask(props.id, !state);
          }}
        >{unDone}</span>}
        <p
          style={{
            fontSize: '13px',
            lineHeight: "19.5px",
            color: "rgba(79, 79, 79, 1)",
            fontWeight: 500,
            textDecoration: state ? "line-through" : "none"
          }}
        >
          {text}
        </p>
        <span style={{
          cursor: "pointer"
        }} onClick={(e) => {
          e.stopPropagation();
          deleteTask(props.id);
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.16663 4.66666C2.16663 4.39052 2.39048 4.16666 2.66663 4.16666H13.3333C13.6094 4.16666 13.8333 4.39052 13.8333 4.66666C13.8333 4.94281 13.6094 5.16666 13.3333 5.16666H2.66663C2.39048 5.16666 2.16663 4.94281 2.16663 4.66666Z" fill="#828282"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66663 6.83334C6.94277 6.83334 7.16663 7.05719 7.16663 7.33334V11.3333C7.16663 11.6095 6.94277 11.8333 6.66663 11.8333C6.39048 11.8333 6.16663 11.6095 6.16663 11.3333V7.33334C6.16663 7.05719 6.39048 6.83334 6.66663 6.83334Z" fill="#828282"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33337 6.83334C9.60952 6.83334 9.83337 7.05719 9.83337 7.33334V11.3333C9.83337 11.6095 9.60952 11.8333 9.33337 11.8333C9.05723 11.8333 8.83337 11.6095 8.83337 11.3333V7.33334C8.83337 7.05719 9.05723 6.83334 9.33337 6.83334Z" fill="#828282"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29176 4.1684C3.56695 4.14546 3.80862 4.34996 3.83155 4.62515L4.49822 12.6251C4.49937 12.639 4.49995 12.6528 4.49995 12.6667C4.49995 12.8877 4.58774 13.0996 4.74402 13.2559C4.9003 13.4122 5.11227 13.5 5.33328 13.5H10.6666C10.8876 13.5 11.0996 13.4122 11.2559 13.2559C11.4121 13.0996 11.4999 12.8877 11.4999 12.6667C11.4999 12.6528 11.5005 12.639 11.5017 12.6251L12.1683 4.62515C12.1913 4.34996 12.4329 4.14546 12.7081 4.1684C12.9833 4.19133 13.1878 4.433 13.1649 4.70819L12.4998 12.6891C12.494 13.1672 12.3015 13.6245 11.963 13.963C11.6192 14.3068 11.1528 14.5 10.6666 14.5H5.33328C4.84705 14.5 4.38073 14.3068 4.03692 13.963C3.69839 13.6245 3.50593 13.1672 3.50008 12.6891L2.83501 4.70819C2.81207 4.433 3.01657 4.19133 3.29176 4.1684Z" fill="#828282"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66667 2.5C6.62246 2.5 6.58007 2.51756 6.54882 2.54882C6.51756 2.58007 6.5 2.62246 6.5 2.66667V4.66667C6.5 4.94281 6.27614 5.16667 6 5.16667C5.72386 5.16667 5.5 4.94281 5.5 4.66667V2.66667C5.5 2.35725 5.62292 2.0605 5.84171 1.84171C6.0605 1.62292 6.35725 1.5 6.66667 1.5H9.33333C9.64275 1.5 9.9395 1.62292 10.1583 1.84171C10.3771 2.0605 10.5 2.35725 10.5 2.66667V4.66667C10.5 4.94281 10.2761 5.16667 10 5.16667C9.72386 5.16667 9.5 4.94281 9.5 4.66667V2.66667C9.5 2.62246 9.48244 2.58007 9.45118 2.54882C9.41993 2.51756 9.37754 2.5 9.33333 2.5H6.66667Z" fill="#828282"/>
          </svg>
        </span>
      </div>
      <div
        className="flex justify-between"
      >
        <div className="flex gap-2 items-center">
        <img src="https://via.placeholder.com/150" alt="task" style={{ width: 25, height: 25, borderRadius: "50%" }} />
        <p style={{
          color: "#828282",
          fontSize: '12px',
        }}>{readableDate}</p>
      </div>
      <p
          style={{
            padding: "4px 14px 4px 14px",
            color: "#2F80ED",
            fontSize: '10px',
            lineHeight: "15px",
            fontWeight: 600,
          backgroundColor: "rgba(47, 128, 237, 0.25)"
          , width: "fit-content",
            borderRadius: "18px"
          }}
        >
          {category}
        </p>
      </div>

    </div>
  )
}

export default Task;