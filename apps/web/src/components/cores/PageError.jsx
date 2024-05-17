export default function PageError(props) {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-6xl">
      <h1>404</h1>
      <p>{props.message}</p>
    </div>
  );
}
