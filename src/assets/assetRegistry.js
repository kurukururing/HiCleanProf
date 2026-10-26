// Registry untuk melacak status lisensi aset
export const assetRegistry = {
  personaAulia: {
    id: 'persona-aulia',
    file: 'persona-aulia.webp',
    source: 'proposal',
    licensed: false,
    mustReplaceBeforePublish: true
  },
  personaSantoso: {
    id: 'persona-santoso',
    file: 'persona-santoso.webp',
    source: 'proposal',
    licensed: false,
    mustReplaceBeforePublish: true
  },
  smartScaleTech: {
    id: 'smart-scale-tech',
    file: 'smart-scale.webp',
    source: 'proposal',
    licensed: true,
    mustReplaceBeforePublish: false
  }
};