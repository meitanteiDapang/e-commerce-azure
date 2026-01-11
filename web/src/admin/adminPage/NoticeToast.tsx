import { } from "react";

type NoticeToastProps = {
  message: string;
};

const NoticeToast = ({ message }: NoticeToastProps) => {

  return (
    <div className="admin-notice">
      <div className="admin-notice-card" role="status" aria-live="polite">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default NoticeToast;
