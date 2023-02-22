import React from "react";

const RightFooter = () => {
  return (
    <footer className="right__footer">
      <div className="right__footer__container">
        <div className="details__container">
          <div className="d-links">
            <a href="">Biz barada</a>
            <a href="">Biz bilen habarlas</a>
          </div>
          <div className="social-media__container">
            <a href="">
              <span className="s-link-twitter"></span>
            </a>
            <a href="">
              <span className="s-link-telegram"></span>
            </a>
          </div>
        </div>
        <div className="copyright__container">
          © Coder 2023 . Ahli hukuklar goralan
        </div>
      </div>
    </footer>
  );
};

export default RightFooter;
