export default  function Offers() {
  return (
    <section className="offer">
      <div className="text-center my-5">
        <h1 className="display-4">Offers</h1>
        <hr className="w-25 mx-auto" />
      </div>

      <div className="container">
        <div className="row">

          <div className="col-lg-6 col-md-6 col-12 col-xxl-6 grow">
            <figure>
              <img
                src="/images/New Arrival Sale Instagram Video Post.png"
                alt="offer 1"
                className="img-fluid content rounded w-100"
              />
            </figure>
          </div>

          <div className="col-lg-6 col-md-6 col-12 col-xxl-6 grow">
            <figure>
              <img
                src="/images/Flash Sale Facebook Instagram Post.png"
                alt="offer 2"
                className="img-fluid content rounded w-100"
              />
            </figure>
          </div>

          <div className="col-lg-6 col-md-6 col-12 col-xxl-6 grow">
            <figure>
              <img
                src="/images/Today Only Big Sale Instagram Video Post.png"
                alt="offer 3"
                className="img-fluid content rounded w-100"
              />
            </figure>
          </div>

          <div className="col-lg-6 col-md-6 col-12 col-xxl-6 grow">
            <figure>
              <img
                src="/images/Back to School Sale Instagram Video Post.png"
                alt="offer 4"
                className="img-fluid content rounded w-100"
              />
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}

