export type OrganizationAddress = {
    city: string,
    street: string,
    house: string
}

export type Organization = {
    id: number,
    name: string,
    headManagerName: string,
    phone: string,
    address: OrganizationAddress
}