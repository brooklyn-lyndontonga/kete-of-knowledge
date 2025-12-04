/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
export default function ErrorState({ message }) {
  return (
    <div className="p-6 text-center text-red-600">
      <p>{message || "Something went wrong."}</p>
    </div>
  )
}
