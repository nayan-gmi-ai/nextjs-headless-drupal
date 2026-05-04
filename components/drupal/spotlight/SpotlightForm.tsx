"use client";

import React from "react";
import { uploadFileToDrupal } from "@/lib/uploadFile";
import { submitWebform } from "@/lib/submitWebform";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SpotlightSuccessModal from "./SpotlightSuccessModal";

const SUPPORTED_FORMATS = ["application/pdf", "image/jpeg", "image/png"];

const schema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),

  participants: yup.array().of(
    yup.object().shape({
      fullName: yup.string().required("Full name is required"),
      file: yup
        .mixed<File>()
        .nullable()
        .test("fileType", "Only PDF, JPEG, PNG allowed", (value) => {
          if (!value) return true;
          return SUPPORTED_FORMATS.includes(value.type);
        }),
    })
  ),

  teamMembers: yup
    .number()
    .typeError("Only numbers are allowed")
    .integer("Must be a whole number")
    .min(0, "Cannot be negative")
    .optional()
});

const SpotlightForm: React.FC = () => {

  const [loading, setLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      companyName: "",
      participants: [
        { fullName: "", file: null },
        { fullName: "", file: null },
        { fullName: "", file: null },
      ],
      teamMembers: undefined
    },
  });

  const fieldLabelMap: Record<string, string> = {
    company_name: "Company Name",
    non_pitching_team_members: "Non-pitching team members",

    participant1_name: "Participant 1 Name",
    participant1_eid: "Participant 1 EID",

    participant2_name: "Participant 2 Name",
    participant2_eid: "Participant 2 EID",

    participant3_name: "Participant 3 Name",
    participant3_eid: "Participant 3 EID",
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setServerErrors([]);

    try {
      const WEBFORM_ID = "spotlight";

      const fieldNames = [
        "participant1_eid",
        "participant2_eid",
        "participant3_eid",
      ];

      const uploadedFids = await Promise.all(
        data.participants.map(async (p: any, index: number) => {
          if (!p.file) return null;

          return await uploadFileToDrupal(
            p.file,
            WEBFORM_ID,
            fieldNames[index]
          );
        })
      );

      const payload = {
        webform_id: WEBFORM_ID,
        company_name: data.companyName,
        non_pitching_team_members: data.teamMembers,

        participant1_name: data.participants[0]?.fullName,
        participant1_eid: uploadedFids[0] ?? "",

        participant2_name: data.participants[1]?.fullName,
        participant2_eid: uploadedFids[1] ?? "",

        participant3_name: data.participants[2]?.fullName,
        participant3_eid: uploadedFids[2] ?? "",
      };

      const response = await submitWebform(payload);

      // HANDLE BACKEND ERRORS
      if (!response.ok) {
        const errorsObj = response.data?.error || {};

        const errorMessages = Object.entries(errorsObj).map(
          ([key, value]: any) => {
            const label = fieldLabelMap[key] || key;
            return `${label}: ${value}`;
          }
        );

        setServerErrors(errorMessages);
        setTimeout(() => {
          document
            .getElementById("form-errors")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);

        return;
      }

      // SUCCESS
      console.log("Submitted successfully", response.data);
      reset({
        companyName: "",
        participants: [
          { fullName: "", file: null },
          { fullName: "", file: null },
          { fullName: "", file: null },
        ],
        teamMembers: undefined,
      });

      setServerErrors([]);
      const modalEl = document.getElementById("spotlightSuccessMsg");
      const modal = new window.bootstrap.Modal(modalEl);
      modal.show();

    } catch (error) {
      console.error(error);

      setServerErrors(["Something went wrong. Please try again."]);

      setTimeout(() => {
        document
          .getElementById("form-errors")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="form-section section-space-top section-space-bottom"
      id="register"
    >
      <div className="container">
        <div className="disc">
          <h2>{"Registration Form"}</h2>
          <p>{"Assemble your champions. Draw your project. Prepare your pitch. Submit your details and take center stage at Sobha Spotlight."}</p>
        </div>

        <div className="form-sec-main">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Company Name */}
            <div className="company-details form-sec-gap">
              <div className="form-div">
                <input
                  type="text"
                  placeholder="Company Name"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <span className="error">
                    {errors.companyName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Participants */}
            {[0, 1, 2].map((index) => (
              <div className="participants form-sec-gap" key={index}>
                <span className="title-name">
                  {"Participant"} {index + 1}
                </span>

                <div className="row parti-row">
                  {/* Full Name */}
                  <div className="col-sm-6 parti-col">
                    <div className="form-div">
                      <label className="label-title">Full Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        {...register(`participants.${index}.fullName`)}
                      />
                      {errors.participants?.[index]?.fullName && (
                        <span className="error">
                          {
                            errors.participants[index]?.fullName
                              ?.message
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="col-sm-6 parti-col">
                    <div className="form-div">
                      <label className="label-title">EID Upload</label>

                      <div className="fil-upload">
                        <span className="choose-file">
                          {"Choose file"}
                        </span>

                        <Controller
                          control={control}
                          name={`participants.${index}.file`}
                          render={({ field }) => (
                            <input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                field.onChange(file);
                              }}
                            />
                          )}
                        />
                        {(() => {
                          const file = watch(`participants.${index}.file`);
                          if (!file) return null;

                          const formatSize = (size: number) => {
                            if (size < 1024) return size + " B";
                            if (size < 1024 * 1024)
                              return (size / 1024).toFixed(2) + " KB";
                            return (size / (1024 * 1024)).toFixed(2) + " MB";
                          };

                          return (
                            <span className="file-name">
                              {file.name} ({formatSize(file.size)})
                            </span>
                          );
                        })()}
                      </div>

                      {errors.participants?.[index]?.file && (
                        <span className="error">
                          {errors.participants[index]?.file?.message}
                        </span>
                      )}

                      <span className="support-files">
                        {"Supported files : PDF, JPEG, PNG"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Final Section */}
            <div className="final-upload-sec company-details">
              <div className="row">
                <div className="col-sm-6 parti-col">
                  <div className="form-div">
                    <label className="label-title">
                      {"Non-pitching team members"}
                    </label>
                    <Controller
                      control={control}
                      name="teamMembers"
                      render={({ field }) => (
                        <input
                          type="number"
                          placeholder="Number of team members"
                          value={field.value ?? ""} 
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === "" ? undefined : Number(val));
                          }}
                        />
                      )}
                    />
                    {errors.teamMembers && (
                      <span className="error">
                        {errors.teamMembers.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="submit-main">
              <div className="submit-bttn" style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                <span className="submit-text">
                  <i>{loading ? "SUBMITTING..." : "SUBMIT"}</i>
                </span>

                <input
                  type="submit"
                  className="submit"
                  disabled={loading}
                  style={{ cursor: loading ? "not-allowed" : "pointer" }}
                />

                {loading && (
                  <div className="loader"></div>
                )}
              </div>
            </div>
          </form>
        </div>
        {serverErrors.length > 0 && (
          <div id="form-errors" className="form-errors" style={{ marginTop: '20px' }}>
            <ul>
              {serverErrors.map((err, index) => (
                <li style={{ color: "red" }} key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="masters-scroll-sec"></div>
      <SpotlightSuccessModal />
    </section>

  );
};

export default SpotlightForm;