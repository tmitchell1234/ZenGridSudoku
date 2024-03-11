import Background from "./Background";
import SignUp from "./SignUp";
import LandingTitle from './LandingTitle.js';


export default function SignUpUI() {
  return (
    <div className="Sign-Up-UI">
      <Background />
      <LandingTitle />
      <SignUp/>
    </div>
  );
}
