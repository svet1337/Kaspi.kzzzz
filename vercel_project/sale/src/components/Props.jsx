function Props() {
  return (
    <div className="props">
      <div className="props-btns">
        <div className="props-btn-one">
          <input
            id="props-btn-1"
            className="props-btn"
            type="radio"
            name="props"
            value="doc"
            defaultChecked
          />
          <label id='label-one' htmlFor="props-btn-1">Документы</label>
        </div>
        <div className="props-btn-two">
          <input
            id="props-btn-2"
            className="props-btn"
            type="radio"
            name="props"
            value="req"
          />
          <label id='label-two' htmlFor="props-btn-2">Реквизиты</label>
        </div>
      </div>
    </div>
  );
}

export default Props;
