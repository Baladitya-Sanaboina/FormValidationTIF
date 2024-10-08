import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from "./DataProvider";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC<{
  onNextTab: () => void;
  onPrevTab: () => void;
}> = ({ onNextTab, onPrevTab }) => {
  const { state, setState } = useData()!;

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik<IJobDetails>({
    initialValues: {
      jobDetails: state.jobDetails.jobDetails,
      jobLocation: state.jobDetails.jobLocation,
      jobTitle: state.jobDetails.jobTitle,
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      setState({
        ...state,
        jobDetails: {
          jobDetails: values.jobDetails,
          jobLocation: values.jobLocation,
          jobTitle: values.jobTitle,
        },
      });
      onNextTab();
    },
  });

  const handleBlurWithUpdate = (e: React.FocusEvent<any>) => {
    handleBlur(e);
    setState({
      ...state,
      jobDetails: {
        ...state.jobDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e: any) => {
            handleChange(e);
            setState({
              ...state,
              jobDetails: {
                ...state.jobDetails,
                jobTitle: e.target.value,
              },
            });
          }}
          onBlur={handleBlurWithUpdate}
          value={values.jobTitle}
          error={errors.jobTitle}
          touched={touched.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e: any) => {
            handleChange(e);
            setState({
              ...state,
              jobDetails: {
                ...state.jobDetails,
                jobDetails: e.target.value,
              },
            });
          }}
          onBlur={handleBlurWithUpdate}
          value={values.jobDetails}
          error={errors.jobDetails}
          touched={touched.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e: any) => {
            handleChange(e);
            setState({
              ...state,
              jobDetails: {
                ...state.jobDetails,
                jobLocation: e.target.value,
              },
            });
          }}
          onBlur={handleBlurWithUpdate}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => onPrevTab()}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
