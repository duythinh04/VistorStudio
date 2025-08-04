import LoginFloatButton from "../components/LoginFloatButton";
import ImageSlider from "../components/ImageSlider";
function Home() {
  return (
    <>
      <div className="top-page text-center">
        <h1>ĐỪNG NẢN!! BẠN TUYỆT VỜI MÀ!!</h1>
        <p className="sologan-1">Chúng tôi luôn chú trọng đến từng chi tiết, từng đường nét, để tạo nên một biểu 
          tượng độc đáo, đáng nhớ và tạo dựng niềm tin cho khách hàng của bạn</p>
      </div>
      <div className="main-page text-center">
        <p className="sologan-2">We always pay attention to every detail, every line, to create a unique, memorable symbol and create trust for your customers</p>
      </div>
      <ImageSlider />
      <LoginFloatButton />
    </>
  );
}

export default Home;
