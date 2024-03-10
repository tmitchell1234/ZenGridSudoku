import Background from "./Background";
import SignUp from "./SignUp";
import logo from "../images/logo.png";


export default function SignUpUI() {
  return (
    <div className="Sign-Up-UI">
      <Background />
      <div className="Landing-title">
        <img
          src={logo}
          style={{ width: "auto", height: "calc(100% - 20px", margin: "20px" }}
        />
        Sudoku
      </div>
      <SignUp/>
    </div>
  );
}
