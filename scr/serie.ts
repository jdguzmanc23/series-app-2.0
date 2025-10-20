/**
 * Representa una serie de televisión. Cada instancia contiene datos
 * suficientes para renderizarse en una lista y mostrar un detalle.
 */
export class Serie {
  constructor(
    public id: number,
    public name: string,
    public channel: string,
    public seasons: number,
    public description: string,
    public link: string,
    public image: string
  ) {}
}