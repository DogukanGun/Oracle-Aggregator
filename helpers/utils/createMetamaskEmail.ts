const  createMetamaskEmail = (walletAddress: string):string => {
    return `${walletAddress}@metamask.alterscope.com`;
}

export default createMetamaskEmail;