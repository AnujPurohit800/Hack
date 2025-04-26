import { useEffect, useState } from "react";
import LoginBg from "../assets/LoginBg.jpg";
import { useSignin } from "../Hooks/api/Auth/useSignin";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const {isPending,isSuccess,signinMutation}=useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log(studentId,password)
    await signinMutation(
      {
        studentId,
        password
      }
    )

  }

  return (
    <div className="min-h-screen w-screen relative">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${LoginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.9)",
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-[95%] md:w-[85%] lg:w-[70%] h-[90vh] md:min-h-[20vh] flex flex-col md:flex-row justify-center items-center overflow-hidden shadow-2xl">
          {/* Left Side - Image */}
          <div className="hidden md:block md:w-1/2 h-[95%] pl-3">
            <img
              src={LoginBg}
              alt="Login"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-start gap-4 md:gap-6">
            <h1 className="text-center font-bold text-black text-xl md:text-2xl mb-2">
              Hey there, welcome back to{" "}
              <span className="text-[#4CAF50]">Back2U</span>!
            </h1>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 text-sm md:text-base text-center ${
                    isLogin
                      ? "bg-[#2462EA] text-[#F7F9FB]"
                      : "bg-[#F1F5F9] text-[#0F172A]"
                  } rounded-l-lg transition-colors`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-2 text-sm md:text-base text-center ${
                    !isLogin
                      ? "bg-[#2462EA] text-[#F7F9FB]"
                      : "bg-[#F1F5F9] text-[#0F172A]"
                  } rounded-r-lg transition-colors`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-3 md:space-y-4 text-black"
              >
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-[#64748B] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-[#2462EA] focus:ring-2 outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#64748B] mb-1">
                        Student ID
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => {
                          
                        }}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-[#2462EA] focus:ring-2 outline-none"
                        placeholder="Enter your student ID"
                      />
                    </div>
                    <div>
                      <label className="block text-[#64748B] mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-[#2462EA] focus:ring-2 outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                  </>
                )}

                {isLogin && (
                  <div>
                    <label className="block text-[#64748B] mb-1">
                      Student Id
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full p-1.5 md:p-2 text-sm md:text-base border border-[#E2E8F0] rounded-lg focus:ring-[#2462EA] focus:ring-2 outline-none"
                      placeholder="Enter your username"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[#64748B] mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-[#2462EA] focus:ring-2 outline-none"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 md:py-2 text-sm md:text-base bg-[#2462EA] text-[#F7F9FB] rounded-lg hover:bg-[#2462EA]/90 transition-colors"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
