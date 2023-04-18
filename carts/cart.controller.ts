import { Request, Response } from 'express'
import { CartService } from './cart.service'
import { CreateCartDto } from './entities'
import { logger } from '../logger/logger.service'
import { IResponse } from '../index'
export class CartController {
  static Instance: any
  constructor (
    private readonly cartService = new CartService(),
    public createCart = (req: Request, res: Response) => {
      const dto: CreateCartDto = req.body
      this.cartService.createCart(dto).then((response: IResponse) => {
        if (response.ok) res.status(201).send(response)
        else res.status(400).send(response)
      }).catch((error: any) => {
        logger.error({
          function: 'CartController.createCart',
          error
        })
        res.status(400).send(error)
      })
    },
    public updateCart = (req: Request, res: Response) => {
      const { id } = req.body
      const dto: CreateCartDto = req.body
      this.cartService.updateCart(dto, id)
        .then((response: IResponse) => {
          if (response.ok) res.status(200).send(response)
          else res.status(400).send(response)
        })
        .catch((error: any) => {
          logger.error({
            function: 'CartController.updateCart',
            error
          })
          res.status(400).send(error)
        })
    },
    public deleteCart = (req: Request, res: Response) => {
      const { id } = req.body
      this.cartService.deleteCart(id).then((response: IResponse) => {
        if (response.ok) res.status(200).send(response)
        else res.status(400).send(response)
      })
        .catch((error: any) => {
          logger.error({
            function: 'CartController.deleteCart',
            error
          })
        })
    }
  ) {
    // SINGLETON PATTERN
    if (CartController.Instance !== undefined) return CartController.Instance
    else CartController.Instance = this
    return this
  }
}
