import Dropzone from "../features/components/dropzone";

export default function Home() {
  return (
    <div>
      <main className="bg-gray-800 h-screen flex justify-center items-center">
        <div className="max-w-screen-xl w-screen flex items-center justify-center">
          <Dropzone />
        </div>
      </main>
    </div>
  );
}
