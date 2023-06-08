import Image from "next/image";
import CreatePost from "./component/Addpost";

export default function Home() {
  return (
    <main>
      <h1>Hello everyone?</h1>
      <CreatePost />
    </main>
  );
}
