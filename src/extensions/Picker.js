import { useState, useEffect } from "react";
import {
  Wrapper,
  FieldExtensionType,
  FieldExtensionFeature,
  useFieldExtension,
  ExtensionType,
} from "@graphcms/uix-react-sdk";
import React from "react";
import { request, gql } from "graphql-request";

async function fetchPositions() {
  const endpoint = "https://api-eu-central-1.hygraph.com/v2/cl7ewe75c65yi01t2hfqb7z9g/master";

  //Here you can pass variables and headers. Headers can also help you ask for locales, stages
  const variables = {};
  const headers = {
    // Authotization: `Bearer <Token Value>`,
  };
  //Write here what values do you want to query
  const query = gql`
  {
    testValues {
      title
    }
  }`;

  const data = await request(endpoint, query, variables, headers);
  return data;
}

function MyField() {
  const [dropdownValues, setDropDownValues] = useState([]);
  useEffect(() => {
    fetchPositions().then((data) => {
      console.log(data);
      setDropDownValues(data.testValues);
    });
  }, []);

  const { value, onChange } = useFieldExtension();
  return (
    <select onChange={(e) => onChange(e.target.value)} value={value}>
      {dropdownValues.map((val, index) => {
        return <option>{val.title}</option>;
      })}
    </select>
  );
}
/** @type {import('@graphcms/uix-react-sdk').FieldExtensionDeclaration} */
const declaration = {
  extensionType: ExtensionType.field,
  fieldType: FieldExtensionType.STRING,
  name: "My Custom Field",
  features: [FieldExtensionFeature.FieldRenderer],
};
export default function MyCustomInputExtensionPage() {
  return (
    <Wrapper declaration={declaration}>
      <MyField />
    </Wrapper>
  );
}
