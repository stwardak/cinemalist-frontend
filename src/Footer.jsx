export function Footer() {
  return (
    <footer className="border-t-2 border-grey bg-black text-grey-300 p-10">
      <div className="container mx-auto flex flex-wrap items-center md:flex-row md:justify-between text-center space-y-4 md:space-y-0">
        
        <a href="/" className="font-extrabold text-4xl text-white text-center">
          The Cinemalist.
        </a>
        
        {/* Navigation links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-5">
            <li><a href="#" className="text-lg font-bold hover:text-white">About</a></li>
            <li><a href="#" className="text-lg font-bold hover:text-white">Get Started</a></li>
            <li><a href="#" className="text-lg font-bold hover:text-white">Help</a></li>
            <li><a href="#" className="text-lg font-bold hover:text-white">Terms</a></li>
            <li><a href="#" className="text-lg font-bold hover:text-white">Contact</a></li>
          </ul>
        </nav>
        
        {/* TMDb Credit */}
        <div className="text-lg">
          <p className="flex items-center justify-center md:justify-start">
            Movie data from 
            <a href="https://www.themoviedb.org" className="underline hover:text-white ml-1">
              TMDb.
            </a>
            <a href="https://www.themoviedb.org">
              <img src="/src/assets/tmdblogo.svg" className="w-24 h-24 ml-2" alt="TMDb" />
            </a>
          </p>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-grey mt-8">
        © 2024 The Cinemalist. All rights reserved.
      </div>
    </footer>
  );
}



// export function Footer() {
//   return (
//     <footer className="bg-black text-grey p-20">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
//         <a href="/" className="font-extrabold text-4xl text-white">
//           The Cinemalist.
//         </a>
//         <nav>
//           <ul className="flex flex-wrap justify-center items-center space-x-10">
//             {/* Dummy links */}
//             <li>
//               <a href="#" className="text-lg font-bold hover:text-white">About</a>
//             </li>
//             <li>
//               <a href="#" className="text-lg font-bold hover:text-white">Get Started</a>
//             </li>
//             <li>
//               <a href="#" className="text-lg font-bold hover:text-white">Help</a>
//             </li>
//             <li>
//               <a href="#" className="text-lg font-bold hover:text-white">Terms</a>
//             </li>
//             <li>
//               <a href="#" className="text-lg font-bold hover:text-white">Contact</a>
//             </li>
//           </ul>
//         </nav>

//         <div>
//           <p className="flex items-center text-lg">
//             Movie data from{" "}
//             <a href="https://www.themoviedb.org" className="underline hover:text-white ml-1">
//               TMDb.
//             </a><br/>
//             <a href="https://www.themoviedb.org">
//               <img src="/src/assets/tmdblogo.svg" className="w-24 h-24 ml-2" alt="TMDb" />
//             </a>
//           </p>
//         </div>
//       </div>
//       <p className= "flex items-center justify-center py-16">
//           © 2024 The Cinemalist. All rights reserved.
//       </p>
//     </footer>
//   );
// }