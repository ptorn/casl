import { Ability } from '@casl/ability'
import { TestBed } from '@angular/core/testing'
import { AbilityModule } from '../dist/es6'
import { App, Post } from './spec_helper'

describe('Ability', () => {
  let fixture

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AbilityModule.forRoot()],
      declarations: [App]
    })
    await TestBed.compileComponents()
  })

  describe('module', () => {
    it('provides empty `Ability` instance', () => {
      const ability = TestBed.get(Ability)

      expect(ability).to.be.instanceof(Ability)
      expect(ability.rules).to.be.empty
    })

    it('provides `can` pipe', () => {
      fixture = createComponent(App)

      expect(fixture.nativeElement.textContent).to.equal('false')

      fixture.destroy()
    })
  })

  describe('`can` pipe', () => {
    let ability
    let post

    beforeEach(() => {
      ability = TestBed.get(Ability)
      post = new Post({ author: 'me' })
    })

    afterEach(() => {
      fixture.destroy()
    })

    it('updates template when `ability` is updated', () => {
      fixture = createComponent(App, { post })
      ability.update([{ subject: Post.name, action: 'read' }])
      fixture.detectChanges()

      expect(fixture.nativeElement.textContent).to.equal('true')
    })

    describe('when abilities depends on object attribute', () => {
      beforeEach(() => {
        ability.update([{ subject: Post.name, action: 'read', conditions: { author: 'me' } }])
        fixture = createComponent(App, { post })
        fixture.detectChanges()
      })

      it('returns `true` if object attribute equals to specified value', () => {
        expect(fixture.nativeElement.textContent).to.equal('true')
      })

      it('updates template when object attribute is changed', () => {
        post.author = 'not me'
        fixture.detectChanges()

        expect(fixture.nativeElement.textContent).to.equal('false')
      })
    })
  })

  function createComponent(Type, inputs) {
    const cmp = TestBed.createComponent(Type)
    Object.assign(cmp.componentInstance, inputs)
    cmp.detectChanges()

    return cmp
  }
})
