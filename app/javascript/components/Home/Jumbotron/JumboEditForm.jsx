import React, { Fragment } from "react";
import { EditButton, UpdateButton } from "../../Constants/Buttons";
import { RadioDials } from "../../Constants/Constants";

const JumboEditForm = props => {
  let dialData = {
    1: 0.1,
    2: 0.2,
    3: 0.3,
    4: 0.4,
    5: 0.5,
    6: 0.6,
    7: 0.7,
    8: 0.8,
    9: 0.9,
    10: 1.0
  };
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
                  <h2>Current opacity is: {props.opacity}</h2>

                  <RadioDials formConst={dialData} onChange={props.onChange} />

                  <h1 className="font-weight-normal py-3">
                    Update your info here...
                  </h1>

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
                        type="text"
                        name="line3"
                        id="line3"
                        className="form-control"
                        onChange={props.onChange}
                        value={props.line3}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="image"
                        id="image"
                        className="form-control"
                        onChange={props.onChange}
                        value={props.image}
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
