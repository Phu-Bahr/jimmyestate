import React, { Fragment } from "react";
import { EditButton, UpdateButton } from "../../Constants/Buttons";
import { SliderBar } from "../../Constants/Constants";

const style = { width: 500 };

const JumboEditForm = props => {
  return (
    <Fragment>
      {props.user.admin && (
        <Fragment>
          <div className="col-sm-12 pt-5 pb-2">
            <EditButton onClick={props.clickEdit} />
          </div>

          {!props.hideDiv && (
            <div className="container pb-3">
              <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                  <h1 className="font-weight-normal pt-1 pb-3">
                    Update hero here...
                  </h1>
                  <form onSubmit={props.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="image"
                        id="image"
                        className="form-control pb-2"
                        onChange={props.onChange}
                        value={props.image}
                        placeholder="Url for background image."
                      />
                    </div>
                    <div className="pb-5">
                      <p>
                        Background Opacity: {Math.floor(props.opacity * 100)}%
                      </p>
                      <SliderBar
                        onSliderChange={props.onSliderChange}
                        opacity={props.opacity * 100}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="line1"
                        id="line1"
                        className="form-control"
                        onChange={props.onChange}
                        value={props.line1}
                        placeholder="Line 1"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="line2"
                        id="line2"
                        className="form-control"
                        onChange={props.onChange}
                        value={props.line2}
                        placeholder="Line 2"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="line3"
                        id="line3"
                        className="form-control"
                        onChange={props.onChange}
                        value={props.line3}
                        placeholder="Line 3"
                      />
                    </div>

                    <UpdateButton className="mt-3" value="Update title data" />
                  </form>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default JumboEditForm;
