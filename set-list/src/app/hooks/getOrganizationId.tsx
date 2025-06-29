const getOrganizationId = async (): Promise<string | undefined> => {
    const response = await fetch('https://www.eventbriteapi.com/v3/users/me/organizations/', {
        headers: {
          'Authorization': `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    const data = await response.json();
    if (data) {
        return data.organizations[0].id;
    } else {
        console.log("Failed to get organization Id");
    }
}

export default getOrganizationId;