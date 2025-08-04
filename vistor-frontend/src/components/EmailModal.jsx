import {useState} from "react";
import emailjs from "@emailjs/browser";

export default function EmailModal({isOpen, onClose}){
    const [name,setName] = useState("");
    const [email,setEmail]= useState("");
    const [mess,setMess]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const templateParams={
            from_name:name,
            from_email:email,
            message:mess,
        }

                emailjs.send("service_kma5cny", "template_vistor", templateParams, "7Nfc1s6-cRNVv-zNu")
            .then(() => {
                alert("Gửi thành công! Cảm ơn bạn đã liên hệ.");
                onClose();
            })
            .catch((error) => {
                console.error("Lỗi khi gửi:", error);
                alert("Gửi thất bại. Vui lòng thử lại sau.");
            });
    };

    if(!isOpen) return null;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{zIndex:9050}}>
            <div className="bg-white p-4 rounded shadow" style={{ width: "90%", maxWidth:"500px"}}>
                <h5>Liên hệ chúng tôi</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                        <label>Tên của bạn?</label>
                        <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="form-group mt-2">
                        <label>Email của bạn?</label>
                        <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group mt-2">
                        <label>Nội dung</label>
                        <textarea className="form-control" value={mess} onChange={(e)=>setMess(e.target.value)} />
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Đóng</button>
                        <button type="submit" className="btn btn-primary">Gửi</button>
                    </div>
                </form>
            </div>
        </div>
    )


}