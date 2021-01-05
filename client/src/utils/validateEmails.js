const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    //this filter is from emailregex.com
    .filter((email) => re.test(email) === false)
    .filter((email) => email); //remove emtpy string "" after (,) from the end

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
