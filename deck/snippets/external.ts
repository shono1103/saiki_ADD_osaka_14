/**
 * スライドから `<<< @/snippets/external.ts#greet` で取り込まれるサンプル。
 * `#region` / `#endregion` で囲んだ範囲だけを切り出せる。
 */

// #region greet
export function greet(name: string): string {
  return `こんにちは、${name} さん`
}
// #endregion greet

// #region sum
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}
// #endregion sum
