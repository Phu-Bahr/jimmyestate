import React, { Fragment } from "react";
import { EditButton, UpdateButton } from "../../Constants/Buttons";

const JumboEditForm = props => {
  return (
    <Fragment>
      {props.user.admin && (
        <Fragment>
          <div className="col-sm-12 p-5">
            <EditButton onClick={props.clickEdit} />
          </div>

          {!props.hideDiv && (
            <div className="container pb-3">
              <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                  <p className="font-weight-normal mb-3">
                    Update your info here...
                  </p>

                  <form onSubmit={props.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="line1"
                        id="line1"
                        className="form-control"
                        onChange={props.onChange}
                        value={props.line1}
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
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="textarea"
                        name="line3"
                        id="line3"
                        className="form-control"
                        onChange={props.onChange}
                        value={props.line3}
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
