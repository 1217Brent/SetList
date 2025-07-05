import getOrganizationId from "./getOrganizationId"

const createEvent = () => {
    const organizationId = getOrganizationId();
    const eventPaylod = {
        event: {
            name: {
                html: eventData.title
            }
        }
    }
}