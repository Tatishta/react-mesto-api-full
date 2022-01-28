function PopupWithForm(props) {

  return (
    <div
      className={`popup popup_function_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <button
        type="button"
        className="popup__close"
        onClick={props.onClose}></button>
      <form
        className="popup__form"
        name={`${props.name}`}
        onSubmit={props.onSubmit}>
        {props.title && <h2 className="popup__title">{props.title}</h2>}
        {props.children}
        {props.button && <button
          className={`popup__button popup__submit_${props.name}`}
          type="submit">{props.button}
        </button>}
      </form>
    </div>
  );
}

export default PopupWithForm;
