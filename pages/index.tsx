import { Inter } from "@next/font/google";
import Home from "../views/Home";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
export default HomePage;
