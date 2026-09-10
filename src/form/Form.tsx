import { gray, red, rose } from "@/constants/color-palettes";
import { useMasterData } from "@/contexts/MasterDataContext";
import { useForm } from "@/form/useForm";
import globalStyles from "@/styles/globalStyles";
import inputStyles from "@/styles/inputStyles";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AppCamera from "./components/AppCamera";
import AppSlider from "./components/AppSlider";
import AppSwitch from "./components/AppSwitch";
import DatePicker from "./components/DatePicker";
import Picker from "./components/Picker";
import Selector from "./components/Selector";
import StepPicker from "./components/StepPicker";
import TimePicker from "./components/TimePicker";
import { FocusedField, FormProps } from "./types";


export default function Form<T extends object>({
  sections,
  initialData,
  fieldRenderer,
  renderFooter,
}: FormProps<T>) {
  const masterData = useMasterData();
  const [focused, setFocused] = useState<FocusedField<T>>(null);

  const {
    data,
    errors,
    setData,
    setErrors,
    handleFocus,
    handleChange,
    handleBlur,
  } = useForm<T>(initialData);

  console.log(data);

  return (
    <View style={styles.container}>
      {sections.map((section, index) => {
        const { title, fields, showSection } = section;
        if (showSection && showSection(data)) return null;

        return (
          <View key={index} style={styles.section}>
            {title && (
              <View style={styles.headerContainer}>
                <Text style={styles.headerTxt}>{title}</Text>
              </View>
            )}
            <View style={{ paddingHorizontal: 12, gap: 20 }}>
              {fields.map((field) => {
                const { key, label, constraints, type, props } = field;
                const value = data[key];

                const { labelRight, prefix, suffix } = fieldRenderer(key, data);

                // ---------- 1️⃣ Decide input UI ----------
                let inputUI: React.ReactNode;

                switch (type) {
                  case "AppCamera":
                    const { cameraMode } = props;
                    inputUI = (
                      <AppCamera
                        label={label}
                        value={value}
                        cameraMode={cameraMode}
                        onScanned={(data) => handleChange(key, data.data)}
                        onChange={(text) => handleChange(key, text)}
                      />
                    );
                    break;

                  case "AppSlider":
                    const { minValue, maxValue, step } = props;
                    inputUI = (
                      <AppSlider
                        label={label}
                        value={value}
                        minValue={minValue}
                        maxValue={maxValue}
                        step={step}
                        onChange={(value) => handleChange(key, value)}
                      />
                    );
                    break;

                  case "AppSwitch": {
                    const { description } = props;
                    inputUI = (
                      <AppSwitch
                        label={label}
                        description={description}
                        value={value}
                        onChange={(value) => handleChange(key, value)}
                      />
                    );
                    break;
                  }

                  case "Selector": {
                    const { options, clearable } = props;
                    inputUI = (
                      <Selector
                        value={value}
                        options={options}
                        onChange={(value) => handleChange(key, value)}
                        clearable={clearable}
                      />
                    );
                    break;
                  }

                  case "Picker": {
                    const { options_key, options } = props;
                    const inputOptions = options_key
                      ? masterData[options_key]
                      : options;

                    inputUI = (
                      <Picker
                        label={label}
                        value={value}
                        options={inputOptions ?? []}
                        onSelect={(value) => {
                          handleChange(key, value);
                        }}
                      />
                    );
                    break;
                  }

                  case "StepPicker": {
                    const { options_key, options } = props;
                    const inputOptions = options_key
                      ? masterData[options_key]
                      : options;

                    inputUI = (
                      <StepPicker
                        label={label}
                        value={value}
                        options={inputOptions ?? []}
                        onSelect={(value) => {
                          handleFocus(key);
                          handleChange(key, value);
                        }}
                      />
                    );
                    break;
                  }

                  case "DatePicker":
                    inputUI = (
                      <DatePicker
                        value={value}
                        minimumDate={props.minimumDate}
                        maximumDate={props.maximumDate}
                        onChange={(date) => handleChange(key, date)}
                      />
                    );
                    break;

                  case "TimePicker":
                    inputUI = (
                      <TimePicker
                        value={value}
                        onChange={(time) => handleChange(key, time)}
                      />
                    );
                    break;

                  default:
                    inputUI = (
                      <View
                        style={[
                          inputStyles.inputContainer,
                          focused === key && globalStyles.focusedInput,
                        ]}
                      >
                        {prefix}
                        <TextInput
                          {...props}
                          maxLength={constraints?.maxLength}
                          value={value}
                          onFocus={() => {
                            setFocused(key);
                            handleFocus(key);
                          }}
                          onChangeText={(text) => {
                            handleChange(key, text);
                          }}
                          onBlur={() => {
                            setFocused(null);
                            handleBlur(key, constraints);
                          }}
                          style={inputStyles.input}
                        />
                        {suffix}
                      </View>
                    );
                }

                return (
                  <View key={key} style={inputStyles.container}>
                    {/* Input Label */}
                    <View style={styles.labelContainer}>
                      {label &&
                        <Text style={[styles.labelText, focused === key && { color: rose[8] }]}>
                          {label}{constraints?.required && "*"}
                        </Text>
                      }
                      {labelRight}
                    </View>

                    {inputUI}

                    {/* Input Error */}
                    {errors[key] && (
                      <View style={styles.errorContainer}>
                        <FontAwesome
                          name="warning"
                          size={13}
                          color={red[6]}
                          style={{ marginTop: 4 }}
                        />
                        <Text style={styles.errorText}>
                          {errors[key as keyof T]}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
      {renderFooter({ data, setErrors })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  section: {
    gap: 20,
    padding: 20,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: gray[1],
    backgroundColor: "white",
  },
  headerContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: gray[1],
  },
  headerTxt: {
    fontFamily: "RajdhaniSemiBold",
    fontSize: 19,
    color: gray[5],
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 15,
    fontFamily: "NunitoBold",
  },
  errorContainer: {
    flexDirection: "row",
    gap: 6,
  },
  errorText: {
    color: red[6],
  },
});
