const Modal = ({ children, className }) => (
  <>
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 shadow-2xl">
      <div className={`modal bg-white rounded-sm shadow-lg ${ className }`}>
        <div>{children}</div>
      </div>
    </div>
  </>
);

export default Modal;