import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

export default function LoginFloatButton() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  if (isLoggedIn) return null; 

  return (
    <>
      <button
        className="btn btn-primary rounded-circle shadow"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          zIndex: 1000,
          fontSize: "20px",
        }}
        title="Đăng nhập"
        onClick={() => setShow(true)}
      >
        <i className="fas fa-sign-in-alt"></i>
      </button>

      <LoginModal
        isOpen={show}
        onClose={() => {
          setShow(false);
          // Sau khi đóng modal, kiểm tra lại token
          const token = localStorage.getItem("token");
          if (token) setIsLoggedIn(true);
        }}
      />
    </>
  );
}
