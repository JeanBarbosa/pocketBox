import { render } from "@testing-library/react-native"
import { Input } from "../src/components/Input"
import { Profile } from "../src/components/Profile"

describe("Components", () => {
  test("should render input component", async () => {
    const input = render(
      <Input>
        <Input.Field></Input.Field>
      </Input>
    )
    expect(input).toBeTruthy()
  })

  test("should render the profile component", async () => {
    const logout = jest.fn()
    const onClose = jest.fn()
    const user = {
      id: "123",
      firstName: "Jean",
      email: "a@b.c",
    }

    const profile = render(
      <Profile user={user} onClose={onClose} logout={logout} />
    )

    expect(profile)
  })
})
