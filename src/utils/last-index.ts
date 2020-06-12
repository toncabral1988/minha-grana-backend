import { Transaction, Model } from  'sequelize'

export default async <T>(transaction?: Transaction): Promise<number> => {
  const [lastIndex] = await T.findAll({
    limit: 1,
    order: [['id', 'DESC']],
    transaction
  })

  if (lastIndex) {
    return lastIndex.id
  }

  return 0
}