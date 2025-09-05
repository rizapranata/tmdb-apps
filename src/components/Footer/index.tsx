import movieIconGrey from "../../assets/images/MoovieTime-Logo-Grey.svg";

export default function Footer() {
  return (
    <footer className="footer w-full">
      <div className=" bg-slate-700 ">
        <div className="container md:flex md:justify-around text-sm text-center text-gray-400 py-4">
          <p>&copy; 2025 Movie App - ❄rizapranata</p>
          <img className="w-20" src={movieIconGrey} alt="movie-icon" />
          <p>Powered by React and Redux</p>
        </div>
      </div>
    </footer>
  );
}
