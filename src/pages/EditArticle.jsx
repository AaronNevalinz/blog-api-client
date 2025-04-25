import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext.jsx";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip.jsx";
import axios from "axios";
import logo from "../../public/logo.png";
import { IoIosLogOut } from "react-icons/io";
import userLogo from "../../public/user.jpg";

export default function EditArticle() {
  const { id } = useParams();
  const {
    token,
    loggedUserProfile,
    setUser,
    setLoggedInUserProfile,
    setToken,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const textareaRef = useRef(null);
  const formRef = useRef(null);
  const [image, setImage] = useState(null);
  const [article, setArticle] = useState({});

  const getPost = async () => {
    const res = await fetch(`http://localhost:8080/blog/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setArticle(data.result);
    } else {
      console.log("Lil summm happened");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleStoryChange = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  // form submissions
  const handleEditArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append(
      "post",
      new Blob([JSON.stringify(article)], { type: "application/json" })
    );


    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    axios
      .put(`http://localhost:8080/blog/update-post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate(0);
        toast.success("Post Updated successfully");
      })
      .catch((error) => {
        toast.error("Error publishing post");
        console.log(error);
      });
  };
  // handle publish button click
  const handlePublishClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    setToken(null);
    setLoggedInUserProfile(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="">
      <nav className="shadow-md fixed w-full bg-white">
        <div className="flex items-center justify-between max-w-4xl mx-auto py-2">
          <Link
            className={
              "bg-gradient-to-r font-bold font-montserrat from-blue-900 to-red-500 inline-block text-transparent bg-clip-text text-2xl"
            }
            to="/feed"
          >
            <div className="flex items-center gap-x-3">
              <img src={logo} alt="" className="w-8" />
              <span>
                Reeadsy<span className="italic font-black text-2xl">!</span>
              </span>
            </div>
          </Link>

          <ul className={"flex gap-x-6 items-center cursor-pointer"}>
            <li>
              <button
                onClick={handlePublishClick}
                className={
                  "bg-blue-900 cursor-pointer px-4 py-1 rounded-full text-slate-200"
                }
              >
                Save Changes
              </button>
            </li>
            <li>
              <p>Profile</p>
            </li>
            <li>
              <DropdownMenu className={""}>
                <DropdownMenuTrigger>
                  {loggedUserProfile ? (
                    <div
                      className={
                        "w-[2.5rem] cursor-pointer h-[2.5rem] shadow-sm rounded-full"
                      }
                    >
                      <img
                        src={loggedUserProfile.imgUrl}
                        className="h-full w-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                  ) : (
                    <img
                      src={userLogo}
                      className="w-12 cursor-pointer"
                      alt=""
                    />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={"/profile"}>
                    <DropdownMenuItem className={"cursor-pointer"}>
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <form
                    action=""
                    onSubmit={handleLogout}
                    className="cursor-pointer hover:bg-gray-100 rounded-md"
                  >
                    <button className="cursor-pointer">
                      <DropdownMenuItem>
                        <div className="flex items-center gap-x-2 cursor-pointer">
                          <p>logout</p>
                          <IoIosLogOut />
                        </div>
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={
          "max-w-4xl px-4  mx-auto w-full text-center font-poppins pt-24"
        }
      >
        <h1 className="text-2xl font-bold">EDIT ARTICLE</h1>
      </div>
      <form
        className={"max-w-4xl px-4 md:px-0 mx-auto w-full mt-5"}
        ref={formRef}
        onSubmit={handleEditArticle}
      >
        <label htmlFor="" className="text-2xl text-blue-800 font-bold">
          Edit title
        </label>
        <input
          type="text"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
          className="border-none font-bold text-4xl tracking-wider placeholder:font-medium text-food w-full px-2 py-2 text-gray-700 font-poppins outline-none"
          placeholder="Enter Article title"
        />

        <div>
          <TooltipProvider>
            <Tooltip>
              {/*<TooltipTrigger>*/}
              <label
                className={
                  "mt-1 border border-gray-700 p-1 inline-block rounded-full ml-2 cursor-pointer "
                }
              >
                <div className="flex gap-x-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                  Edit Image
                </div>
                <input
                  type="file"
                  className={"hidden"}
                  accept={"image/*"}
                  onChange={handleFileChange}
                />
              </label>
              {/*</TooltipTrigger>*/}
              <TooltipContent>
                <p>Upload Blog Image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {preview && (
            <div className={"w-full h-[18rem] my-6"}>
              <img
                className={"h-full w-full object-cover"}
                src={preview}
                alt=""
              />
            </div>
          )}
        </div>

        <label className="text-2xl text-blue-800 font-bold " htmlFor="">
          Edit Article Content
        </label>
        <textarea
          ref={textareaRef}
          value={article.content}
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
          onInput={handleStoryChange}
          className="border rounded-xl border-gray-400 text-lg text-food w-full h-[50vh] mt-2 px-4 py-2 overflow-hidde resize-none outline-none"
          placeholder="Tell your Story..."
        />
      </form>
    </div>
  );
}
