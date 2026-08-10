export const getVehicleType = (productName) => {
  if (!productName) return 'Khác';
  const name = productName.toLowerCase();
  if (
    name.includes('sh') ||
    name.includes('air blade') ||
    name.includes('vision') ||
    name.includes('grande') ||
    name.includes('lead') ||
    name.includes('vario') ||
    name.includes('janus') ||
    name.includes('latte') ||
    name.includes('freego') ||
    name.includes('burgman') ||
    name.includes('nvx') ||
    name.includes('pcx') ||
    name.includes('sh mode')
  ) {
    return 'Xe ga';
  }
  if (
    name.includes('wave') ||
    name.includes('future') ||
    name.includes('sirius') ||
    name.includes('blade') ||
    name.includes('jupiter') ||
    name.includes('rsx') ||
    name.includes('smash') ||
    name.includes('viva') ||
    name.includes('super cub')
  ) {
    return 'Xe số';
  }
  if (
    name.includes('exciter') ||
    name.includes('raider') ||
    name.includes('winner') ||
    name.includes('satria') ||
    name.includes('sonic') ||
    name.includes('msx') ||
    name.includes('pg-1') ||
    name.includes('cbr150r') ||
    name.includes('mt-15') ||
    name.includes('r15') ||
    name.includes('gxs')
  ) {
    return 'Xe côn tay';
  }
  if (
    name.includes('z900') ||
    name.includes('cbr') ||
    name.includes('ninja') ||
    name.includes('z1000') ||
    name.includes('cb1000') ||
    name.includes('mt-09') ||
    name.includes('mt-07') ||
    name.includes('r7') ||
    name.includes('r3') ||
    name.includes('gsx-r1000') ||
    name.includes('v-strom')
  ) {
    return 'Moto phân khối lớn';
  }
  return 'Khác';
};
