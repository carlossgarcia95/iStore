import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="bg-slate-600
    text-white text-sm mt-16"
    >
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 md:flex-row gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">Categoies</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">Customer Services</h3>
            <Link href="#">Orders</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
            <Link href="#">Contact Us</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold mb-2">About Us</h3>
            <p className="mb-2">
              We are dedicated to shipping only the highest quality products.
            </p>
            <p className="hidden mt-4 md:block">
          &copy; {new Date().getFullYear()} iStore. All rights reserved.
        </p>
            <p></p>
          </div>
          <div className="md:ml-4">
            <h3 className="font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2 items-center">
              <Link href="#">
                <MdFacebook size={23}/>
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={23} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={25} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={30} />
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center mt-4 md:hidden">
          &copy; {new Date().getFullYear()} iStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
