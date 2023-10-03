import Link from 'next/link';
import Image from 'next/image';

const Register = () => {
  return (
    <main
      className="background min-h-screen flex items-center justify-center "
      style={{ background: 'linear-gradient(to bottom, #9CCECB, #4CA1A3)' }}
    >
      <div className="flex w-3/4">
        <div className="w-3/4 flex items-center justify-center">
          <div className="w-4/5 max-h-full rounded-md overflow-hidden">
            <img
              src="/images/image1.png" /* Thay đổi đường dẫn hình ảnh */
              alt="Register Image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Clouds */}
        </div>
        <div className="w-1/3 p-8 shadow-md rounded-md bg-white flex flex-col items-center ">
          <h1 className="text-3xl font-bold mb-6">Create an account</h1>
          <div className="mb-4 w-3/4">{/* Social media buttons */}</div>
          <div className="flex items-center justify-center mb-4">{/* Separator */}</div>
          <div className="w-3/4 text-center flex flex-col items-center">
            <input
              type="text"
              placeholder="Your email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 mb-4"
            />
            <input
              type="password"
              placeholder="Your password"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 mb-4"
            />
            {/* Register button */}
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md px-4 py-2 w-full mt-4 hover:bg-blue-600 transition duration-300"
              style={{ backgroundColor: '#4D70EB', fontWeight: 'bold' }}
            >
              REGISTER
            </button>
            {/* Login link */}
            <p className="text-center mt-4 text-gray-700">
              Already have an account?{' '}
              <Link href="/login">
                <span style={{ color: '#4d70eb', fontWeight: 'bold' }}>Log In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
