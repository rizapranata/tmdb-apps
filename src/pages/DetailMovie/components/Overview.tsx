type Props = {
  overview: string;
};

export default function Overview({ overview }: Props) {
  return (
    <div className="w-full pt-10 pl-5 pr-5 lg:pl-72 lg:pt-0 xl:pl-96 xl:pr-80 2xl:pl-[570px] my-5">
      <h2 className="text-sm text-red-500 font-semibold">OVERVIEW</h2>
      <p className="text-xs">{overview}</p>
    </div>
  );
}
