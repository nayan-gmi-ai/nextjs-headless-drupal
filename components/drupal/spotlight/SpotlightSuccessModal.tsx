"use client";

import Image from "next/image";

export default function SpotlightSuccessModal() {
    return (
        <div
            className="modal fade"
            id="spotlightSuccessMsg"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-body">
                        <p className="thankyou-img">
                            <Image
                                width="50"
                                height="50"
                                src="/images/thanks-icon.svg"
                                alt="Thank you"
                            />
                        </p>

                        <h2>{"Thank you for submitting"}</h2>

                        <p>{"You've successfully submitted your request!"}</p>

                        <div className="modal-close">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                {"Back To Home"}
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}