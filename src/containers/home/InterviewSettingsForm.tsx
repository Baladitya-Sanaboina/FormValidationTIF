import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import { useData } from "./DataProvider";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{ onPrevTab: () => void }> = ({
  onPrevTab,
}) => {
  const { state, setState } = useData()!;

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewDuration: state.interviewSettings.interviewDuration,
      interviewLanguage: state.interviewSettings.interviewLanguage,
      interviewMode: state.interviewSettings.interviewMode,
    },
    validationSchema: Yup.object().shape({
      interviewDuration: Yup.string().required(
        "Interview duration is required"
      ),
      interviewLanguage: Yup.string().required(
        "Interview language is required"
      ),
      interviewMode: Yup.string().required("Interview mode is required"),
    }),
    onSubmit: (values) => {
      setState({
        requisitionDetails: {
          gender: state.requisitionDetails.gender,
          noOfOpenings: state.requisitionDetails.noOfOpenings,
          requisitionTitle: state.requisitionDetails.requisitionTitle,
          urgency: state.requisitionDetails.urgency,
        },
        jobDetails: {
          jobDetails: state.jobDetails.jobDetails,
          jobLocation: state.jobDetails.jobLocation,
          jobTitle: state.jobDetails.jobTitle,
        },
        interviewSettings: {
          interviewDuration: values.interviewDuration,
          interviewLanguage: values.interviewLanguage,
          interviewMode: values.interviewMode,
        },
      });
      alert("Form successfully submitted");
    },
  });

  const handleSelectChange = (field: string, value: any) => {
    setFieldValue(field, value);
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        [field]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(value: any) => handleSelectChange("interviewMode", value)}
          onBlur={() => setFieldTouched("interviewMode")}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(value: any) =>
            handleSelectChange("interviewDuration", value)
          }
          onBlur={() => setFieldTouched("interviewDuration")}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(value: any) =>
            handleSelectChange("interviewLanguage", value)
          }
          onBlur={() => setFieldTouched("interviewLanguage")}
          value={values?.interviewLanguage}
          error={errors?.interviewLanguage}
          touched={touched?.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={onPrevTab}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
