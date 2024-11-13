import React from "react";
import { useSelector } from "react-redux";
import "../Assets/Styles/Home.scss";

function WelcomeMsg() {
  const intro = [
    "Welcome back",
    "Hello",
    "Great to see you",
    "Welcome",
    "Good to see you",
  ];
  const messageTeacher = [
    "Ready to inspire your students today?",
    "Let's make learning exciting for your students.",
    "Time to share your knowledge.",
  ];
  const messageStudent = [
    "Ready to learn something new today?",
    "Let's dive into your next lesson.",
    "Let’s achieve something great today.",
  ];
  const {userType,userName} = useSelector((state) => state.user.userData);
  const randomIntro = intro[Math.floor(Math.random() * messageTeacher.length)];
  const randomeMsg =
    userType === "Teacher"
      ? messageTeacher[Math.floor(Math.random() * messageTeacher.length)]
      : messageStudent[Math.floor(Math.random() * messageStudent.length)];

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  return (
    <div className="welcomeMsg">
      <h2>{`${randomIntro},${capitalizeName(userName)} ! ${randomeMsg}`}</h2>
    </div>
  );
}
export default WelcomeMsg;
