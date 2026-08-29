
export function splitFullName(fullName = "") {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const separatorIndex = trimmed.indexOf(" ");
  if (separatorIndex === -1) {
    return { firstName: trimmed, lastName: "" };
  }

  return {
    firstName: trimmed.slice(0, separatorIndex),
    lastName: trimmed.slice(separatorIndex + 1).trim(),
  };
}

export function joinFullName({ firstName = "", lastName = "" }) {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
}
